
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, Plus, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

interface Medication {
  name: string;
  dosage: string;
  instructions: string;
  duration: string;
  refill: string;
}

interface PrescriptionFormProps {
  patientName: string;
  patientId: string;
  onClose: () => void;
  onSave: (medications: Medication[]) => void;
}

const DEFAULT_MEDICATION: Medication = {
  name: '',
  dosage: '',
  instructions: '',
  duration: '',
  refill: 'No refills',
};

const DURATION_OPTIONS = [
  '3 days',
  '5 days',
  '7 days',
  '10 days',
  '14 days',
  '1 month',
  '3 months',
  'As needed',
  'Ongoing',
];

const REFILL_OPTIONS = [
  'No refills',
  'One refill',
  'Two refills',
  'Three refills',
  'Unlimited refills for 1 month',
  'Unlimited refills for 3 months',
  'Unlimited refills for 6 months',
  'Unlimited refills for 1 year',
];

const COMMON_MEDICINES = [
  { name: 'Amoxicillin', dosages: ['250mg', '500mg', '875mg'] },
  { name: 'Azithromycin', dosages: ['250mg', '500mg'] },
  { name: 'Lisinopril', dosages: ['5mg', '10mg', '20mg', '40mg'] },
  { name: 'Metformin', dosages: ['500mg', '850mg', '1000mg'] },
  { name: 'Atorvastatin', dosages: ['10mg', '20mg', '40mg', '80mg'] },
  { name: 'Ibuprofen', dosages: ['200mg', '400mg', '600mg', '800mg'] },
  { name: 'Paracetamol', dosages: ['500mg', '650mg'] },
  { name: 'Omeprazole', dosages: ['10mg', '20mg', '40mg'] },
];

const COMMON_INSTRUCTIONS = [
  'Take once daily',
  'Take twice daily',
  'Take three times daily',
  'Take with food',
  'Take on an empty stomach',
  'Take as needed for pain',
  'Take at bedtime',
  'Take in the morning',
];

const PrescriptionForm = ({ patientName, patientId, onClose, onSave }: PrescriptionFormProps) => {
  const [medications, setMedications] = useState<Medication[]>([{ ...DEFAULT_MEDICATION }]);
  const [selectedMedicine, setSelectedMedicine] = useState<string | null>(null);

  const handleMedicationChange = (index: number, field: keyof Medication, value: string) => {
    const updatedMedications = [...medications];
    updatedMedications[index] = { ...updatedMedications[index], [field]: value };
    setMedications(updatedMedications);
  };

  const handleAddMedication = () => {
    setMedications([...medications, { ...DEFAULT_MEDICATION }]);
  };

  const handleRemoveMedication = (index: number) => {
    const updatedMedications = [...medications];
    updatedMedications.splice(index, 1);
    setMedications(updatedMedications);
  };

  const handleSave = () => {
    // Validate that all medications have required fields
    const isValid = medications.every(med => 
      med.name.trim() !== '' && 
      med.dosage.trim() !== '' && 
      med.instructions.trim() !== '' && 
      med.duration.trim() !== ''
    );

    if (!isValid) {
      alert('Please fill in all required fields for all medications');
      return;
    }

    onSave(medications);
  };

  const handleSelectCommonMedicine = (index: number, medicineName: string) => {
    setSelectedMedicine(medicineName);
    const medicine = COMMON_MEDICINES.find(m => m.name === medicineName);
    if (medicine) {
      handleMedicationChange(index, 'name', medicine.name);
      // Default to first dosage if available
      if (medicine.dosages.length > 0) {
        handleMedicationChange(index, 'dosage', medicine.dosages[0]);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">New Prescription</h2>
          <p className="text-gray-600">
            {patientName} (ID: {patientId})
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Date: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="space-y-6">
        {medications.map((medication, index) => (
          <Card key={index} className="relative">
            <CardContent className="p-4">
              {medications.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-2 h-8 w-8 p-0 text-gray-500 hover:text-red-500"
                  onClick={() => handleRemoveMedication(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor={`medication-name-${index}`} className="mb-1 block">
                    Medicine Name*
                  </Label>
                  <Input
                    id={`medication-name-${index}`}
                    value={medication.name}
                    onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                    placeholder="Medicine name"
                    className="mb-2"
                  />
                  <div className="flex flex-wrap gap-1 mt-1">
                    {COMMON_MEDICINES.map((medicine) => (
                      <Badge 
                        key={medicine.name}
                        variant="outline" 
                        className={`cursor-pointer hover:bg-gray-100 ${
                          medication.name === medicine.name ? 'bg-medical-primary text-medical-dark' : ''
                        }`}
                        onClick={() => handleSelectCommonMedicine(index, medicine.name)}
                      >
                        {medicine.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor={`medication-dosage-${index}`} className="mb-1 block">
                    Dosage*
                  </Label>
                  <Input
                    id={`medication-dosage-${index}`}
                    value={medication.dosage}
                    onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                    placeholder="e.g., 500mg"
                    className="mb-2"
                  />
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedMedicine && COMMON_MEDICINES.find(m => m.name === selectedMedicine)?.dosages.map((dosage) => (
                      <Badge 
                        key={dosage}
                        variant="outline" 
                        className={`cursor-pointer hover:bg-gray-100 ${
                          medication.dosage === dosage ? 'bg-medical-primary text-medical-dark' : ''
                        }`}
                        onClick={() => handleMedicationChange(index, 'dosage', dosage)}
                      >
                        {dosage}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <Label htmlFor={`medication-instructions-${index}`} className="mb-1 block">
                  Instructions*
                </Label>
                <Textarea
                  id={`medication-instructions-${index}`}
                  value={medication.instructions}
                  onChange={(e) => handleMedicationChange(index, 'instructions', e.target.value)}
                  placeholder="e.g., Take twice daily with food"
                  className="mb-2"
                />
                <div className="flex flex-wrap gap-1 mt-1">
                  {COMMON_INSTRUCTIONS.map((instruction) => (
                    <Badge 
                      key={instruction}
                      variant="outline" 
                      className={`cursor-pointer hover:bg-gray-100 ${
                        medication.instructions === instruction ? 'bg-medical-primary text-medical-dark' : ''
                      }`}
                      onClick={() => handleMedicationChange(index, 'instructions', instruction)}
                    >
                      {instruction}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`medication-duration-${index}`} className="mb-1 block">
                    Duration*
                  </Label>
                  <Select 
                    value={medication.duration} 
                    onValueChange={(value) => handleMedicationChange(index, 'duration', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {DURATION_OPTIONS.map(option => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor={`medication-refill-${index}`} className="mb-1 block">
                    Refill
                  </Label>
                  <Select 
                    value={medication.refill} 
                    onValueChange={(value) => handleMedicationChange(index, 'refill', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select refill option" />
                    </SelectTrigger>
                    <SelectContent>
                      {REFILL_OPTIONS.map(option => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button
          variant="outline"
          className="w-full"
          onClick={handleAddMedication}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another Medication
        </Button>
      </div>

      <div className="flex justify-end mt-6 space-x-2">
        <Button
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          className="bg-medical-primary text-medical-dark"
          onClick={handleSave}
        >
          <FileText className="h-4 w-4 mr-2" />
          Save Prescription
        </Button>
      </div>
    </div>
  );
};

export default PrescriptionForm;
