import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Scenario1Data {
  hasIdDocument: boolean;
  hasSignature: boolean;
}

interface Scenario2Data {
  birthDate: string;
}

interface Scenario3Data {
  isAuthEnabled: boolean;
  repName: string;
  repId: string;
  repRelationship: string;
  repTitle: string;
}

interface ScenarioControlsProps {
  scenario: number;
  scenario1Data: Scenario1Data;
  scenario2Data: Scenario2Data;
  scenario3Data: Scenario3Data;
  onScenario1Change: (data: Scenario1Data) => void;
  onScenario2Change: (data: Scenario2Data) => void;
  onScenario3Change: (data: Scenario3Data) => void;
}

const ScenarioControls = ({
  scenario,
  scenario1Data,
  scenario2Data,
  scenario3Data,
  onScenario1Change,
  onScenario2Change,
  onScenario3Change
}: ScenarioControlsProps) => {
  const calculateAge = (birthDate: string) => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <Card className="p-6 bg-gradient-card border shadow-medium">
      <div className="space-y-6">
        {scenario === 1 && (
          <div className="space-y-4">
            <div className="border-b pb-2">
              <h3 className="text-lg font-semibold text-banking-blue">Identity Documents</h3>
              <p className="text-sm text-banking-gray">Toggle document availability to test banner display</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="id-document">ID Document Present</Label>
                  <p className="text-xs text-banking-gray">Identity document is available</p>
                </div>
                <Switch
                  id="id-document"
                  checked={scenario1Data.hasIdDocument}
                  onCheckedChange={(checked) =>
                    onScenario1Change({ ...scenario1Data, hasIdDocument: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="signature">Specimen Signature Present</Label>
                  <p className="text-xs text-banking-gray">Signature specimen is available</p>
                </div>
                <Switch
                  id="signature"
                  checked={scenario1Data.hasSignature}
                  onCheckedChange={(checked) =>
                    onScenario1Change({ ...scenario1Data, hasSignature: checked })
                  }
                />
              </div>
            </div>
          </div>
        )}

        {scenario === 2 && (
          <div className="space-y-4">
            <div className="border-b pb-2">
              <h3 className="text-lg font-semibold text-banking-blue">Client Age Verification</h3>
              <p className="text-sm text-banking-gray">Enter birth date to test minor account detection</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="birth-date">Birth Date</Label>
              <Input
                id="birth-date"
                type="date"
                value={scenario2Data.birthDate}
                onChange={(e) =>
                  onScenario2Change({ ...scenario2Data, birthDate: e.target.value })
                }
                className="max-w-xs"
              />
              {scenario2Data.birthDate && (
                <p className="text-xs text-banking-gray">
                  Current age: {calculateAge(scenario2Data.birthDate)} years
                </p>
              )}
            </div>
          </div>
        )}

        {scenario === 3 && (
          <div className="space-y-4">
            <div className="border-b pb-2">
              <h3 className="text-lg font-semibold text-banking-blue">Authorised Representative</h3>
              <p className="text-sm text-banking-gray">Configure authorized person details</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="auth-enabled">Enable Authorisation</Label>
                  <p className="text-xs text-banking-gray">Allow authorized representative access</p>
                </div>
                <Switch
                  id="auth-enabled"
                  checked={scenario3Data.isAuthEnabled}
                  onCheckedChange={(checked) =>
                    onScenario3Change({ ...scenario3Data, isAuthEnabled: checked })
                  }
                />
              </div>

              {scenario3Data.isAuthEnabled && (
                <div className="space-y-4 pl-4 border-l-2 border-banking-blue/20">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rep-title">Title</Label>
                      <Select
                        value={scenario3Data.repTitle}
                        onValueChange={(value) =>
                          onScenario3Change({ ...scenario3Data, repTitle: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select title" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mr">Mr</SelectItem>
                          <SelectItem value="Mrs">Mrs</SelectItem>
                          <SelectItem value="Ms">Ms</SelectItem>
                          <SelectItem value="Dr">Dr</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rep-name">Full Name</Label>
                      <Input
                        id="rep-name"
                        value={scenario3Data.repName}
                        onChange={(e) =>
                          onScenario3Change({ ...scenario3Data, repName: e.target.value })
                        }
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rep-id">ID Number</Label>
                      <Input
                        id="rep-id"
                        value={scenario3Data.repId}
                        onChange={(e) =>
                          onScenario3Change({ ...scenario3Data, repId: e.target.value })
                        }
                        placeholder="123456789"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rep-relationship">Relationship</Label>
                      <Select
                        value={scenario3Data.repRelationship}
                        onValueChange={(value) =>
                          onScenario3Change({ ...scenario3Data, repRelationship: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Spouse">Spouse</SelectItem>
                          <SelectItem value="Parent">Parent</SelectItem>
                          <SelectItem value="Child">Child</SelectItem>
                          <SelectItem value="Sibling">Sibling</SelectItem>
                          <SelectItem value="Legal Guardian">Legal Guardian</SelectItem>
                          <SelectItem value="Attorney">Attorney</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ScenarioControls;