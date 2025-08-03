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
    <Card className="p-8 bg-white border border-gray-200 shadow-sm rounded-2xl">
      <div className="space-y-8">
        {scenario === 1 && (
          <div className="space-y-6">
            <div className="pb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Identity Documents</h3>
              <p className="text-sm text-gray-600">Toggle document availability to test banner display</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="space-y-1">
                  <Label htmlFor="id-document" className="text-base font-medium text-gray-900">ID Document Present</Label>
                  <p className="text-sm text-gray-500">Identity document is available</p>
                </div>
                <Switch
                  id="id-document"
                  checked={scenario1Data.hasIdDocument}
                  onCheckedChange={(checked) =>
                    onScenario1Change({ ...scenario1Data, hasIdDocument: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="space-y-1">
                  <Label htmlFor="signature" className="text-base font-medium text-gray-900">Specimen Signature Present</Label>
                  <p className="text-sm text-gray-500">Signature specimen is available</p>
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
          <div className="space-y-6">
            <div className="pb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Client Age Verification</h3>
              <p className="text-sm text-gray-600">Enter birth date to test minor account detection</p>
            </div>

            <div className="space-y-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
              <Label htmlFor="birth-date" className="text-base font-medium text-gray-900">Birth Date</Label>
              <Input
                id="birth-date"
                type="date"
                value={scenario2Data.birthDate}
                onChange={(e) =>
                  onScenario2Change({ ...scenario2Data, birthDate: e.target.value })
                }
                className="max-w-sm border-gray-200 rounded-xl focus:border-gray-400 focus:ring-0"
              />
              {scenario2Data.birthDate && (
                <p className="text-sm text-gray-500 mt-2">
                  Current age: {calculateAge(scenario2Data.birthDate)} years
                </p>
              )}
            </div>
          </div>
        )}

        {scenario === 3 && (
          <div className="space-y-6">
            <div className="pb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Authorised Representative</h3>
              <p className="text-sm text-gray-600">Configure authorized person details</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="space-y-1">
                  <Label htmlFor="auth-enabled" className="text-base font-medium text-gray-900">Enable Authorisation</Label>
                  <p className="text-sm text-gray-500">Allow authorized representative access</p>
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
                <div className="space-y-6 p-6 border border-gray-200 rounded-xl bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="rep-title" className="text-sm font-medium text-gray-900">Title</Label>
                      <Select
                        value={scenario3Data.repTitle}
                        onValueChange={(value) =>
                          onScenario3Change({ ...scenario3Data, repTitle: value })
                        }
                      >
                        <SelectTrigger className="border-gray-200 rounded-xl focus:border-gray-400 focus:ring-0">
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

                    <div className="space-y-3">
                      <Label htmlFor="rep-name" className="text-sm font-medium text-gray-900">Full Name</Label>
                      <Input
                        id="rep-name"
                        value={scenario3Data.repName}
                        onChange={(e) =>
                          onScenario3Change({ ...scenario3Data, repName: e.target.value })
                        }
                        placeholder="John Doe"
                        className="border-gray-200 rounded-xl focus:border-gray-400 focus:ring-0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="rep-id" className="text-sm font-medium text-gray-900">ID Number</Label>
                      <Input
                        id="rep-id"
                        value={scenario3Data.repId}
                        onChange={(e) =>
                          onScenario3Change({ ...scenario3Data, repId: e.target.value })
                        }
                        placeholder="123456789"
                        className="border-gray-200 rounded-xl focus:border-gray-400 focus:ring-0"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="rep-relationship" className="text-sm font-medium text-gray-900">Relationship</Label>
                      <Select
                        value={scenario3Data.repRelationship}
                        onValueChange={(value) =>
                          onScenario3Change({ ...scenario3Data, repRelationship: value })
                        }
                      >
                        <SelectTrigger className="border-gray-200 rounded-xl focus:border-gray-400 focus:ring-0">
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