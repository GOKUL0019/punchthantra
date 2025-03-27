from dotenv import load_dotenv
load_dotenv()

import os
import gradio as gr

from docbrain import encode_image, analyze_image_with_query
from clientvoice import record_audio, transcribe_with_groq
from docvoice import text_to_speech_with_gtts, text_to_speech_with_elevenlabs

system_prompt = """
You have to act as a professional doctor, i know you are not but this is for learning purpose. 
What's in this image?. Do you find anything wrong with it medically? 
If you make a differential, suggest some remedies for them. Donot add any numbers or special characters in 
your response. Your response should be in one long paragraph. Also always answer as if you are answering to a real person.
Donot say 'In the image I see' but say 'With what I see, I think you have ....'
Dont respond as an AI model in markdown, your answer should mimic that of an actual doctor not an AI bot, 
keep your answer concise (max 5 sentences). No preamble, start your answer right away please
Your response must be in **plain text only**, without using bullet points, markdown symbols, or formatting characters.
"""



def process_inputs(audio_filepath, image_filepath):
    # Convert speech to text
    speech_to_text_output = transcribe_with_groq(
        GROQ_API_KEY=os.environ.get("GROQ_API_KEY"),
        audio_filepath=audio_filepath,
        stt_model="whisper-large-v3"
    )

    # Analyze the image if provided
    if image_filepath:
        doctor_response = analyze_image_with_query(
            query=system_prompt + speech_to_text_output,
            encoded_image=encode_image(image_filepath),
            model="llama-3.2-11b-vision-preview"
        )
    else:
        doctor_response = "No image provided for analysis."

    # Convert doctor's response to speech
    output_filepath = "final.mp3"
    text_to_speech_with_elevenlabs(input_text=doctor_response, output_filepath=output_filepath)

    # Get absolute file path for correct playback
    abs_audio_path = os.path.abspath(output_filepath)

    return speech_to_text_output, doctor_response, abs_audio_path

with gr.Blocks(theme=gr.themes.Soft(), css="""
    body {
        background-color: #1EE210;
        text-align: center;
    }
    .gradio-container {
        max-width: 600px;
        margin: auto;
    }
    .gr-button {
        background-color: #1EE210 !important;
        color: black !important;
        border-radius: 8px;
        font-size: 16px;
        font-weight: bold;
    }
    .gr-box, .gr-textbox, .gr-audio {
        text-align: center;
    }
""") as iface:
    gr.Markdown(
        """
        # PUNCHTHANTRA AI DOC
        **Medical Image & Audio Analysis with AI**  
        Upload an image and record your voice to get a professional AI doctor's response.  
        *The result is not final; visit a doctor if the condition worsens.*
        """
    )

    with gr.Row():
        with gr.Column():
            image_input = gr.Image(type="filepath", label="📷 Upload Medical Image")
        with gr.Column():
            audio_input = gr.Audio(sources=["microphone"], type="filepath", label="🎙️ Record Symptoms")

    submit_btn = gr.Button("🔍 Analyze")

    gr.Markdown("---")

    with gr.Column():
        text_output = gr.Textbox(label="📝 Transcribed Text")
        doctor_response_output = gr.Textbox(label="🩺 Doctor's Response")
        audio_output = gr.Audio(label="🔊 AI Doctor's Voice Response", type="filepath")

    submit_btn.click(
        process_inputs, 
        inputs=[audio_input, image_input], 
        outputs=[text_output, doctor_response_output, audio_output]
    )

iface.launch(debug=True)
