from dotenv import load_dotenv
load_dotenv()

import os
import gradio as gr

from docbrain import encode_image, analyze_image_with_query
from clientvoice import record_audio, transcribe_with_groq
from docvoice import text_to_speech_with_gtts, text_to_speech_with_elevenlabs

system_prompt = """
You are analyzing medical images and responding as a real doctor would. 
Keep your responses concise (max 2 sentences) and provide actionable insights.
tell about the seriousness of the problem weather they must visit a physical doctor or need home remidies.
keep your responses shorter than 100 words.
"""

def process_inputs(audio_filepath, image_filepath):
    speech_to_text_output = transcribe_with_groq(
        GROQ_API_KEY=os.environ.get("GROQ_API_KEY"),
        audio_filepath=audio_filepath,
        stt_model="whisper-large-v3"
    )

    if image_filepath:
        doctor_response = analyze_image_with_query(
            query=system_prompt + speech_to_text_output,
            encoded_image=encode_image(image_filepath),
            model="llama-3.2-11b-vision-preview"
        )
    else:
        doctor_response = "No image provided for analysis."

    voice_of_doctor = text_to_speech_with_elevenlabs(
        input_text=doctor_response,
        output_filepath="final.mp3"
    )

    return speech_to_text_output, doctor_response, voice_of_doctor

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
        # AI DOC
        **Medical Image & Audio Analysis with AI** 
        Upload an image and record your voice to get a professional AI doctor's response.
        The result is not final visit the doctor if the conditions worsen.
        """
    )

    with gr.Row():
        with gr.Column():
            image_input = gr.Image(type="filepath", label=" Upload Medical Image")
        with gr.Column():
            audio_input = gr.Audio(sources=["microphone"], type="filepath", label="🎙️ Record Symptoms")

    submit_btn = gr.Button("Analyze")

    gr.Markdown("---")

    with gr.Column():
        text_output = gr.Textbox(label="Transcribed Text")
        doctor_response_output = gr.Textbox(label="Doctor's Response")
        audio_output = gr.Audio(label="AI Doctor's Voice Response")

    submit_btn.click(
        process_inputs, 
        inputs=[audio_input, image_input], 
        outputs=[text_output, doctor_response_output, audio_output]
    )

iface.launch(debug=True)
