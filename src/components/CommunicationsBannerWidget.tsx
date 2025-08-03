import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Banner from "./Banner";
import ScenarioControls from "./ScenarioControls";
import { FileText, Calendar, Users } from "lucide-react";

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

const CommunicationsBannerWidget = () => {
  const [activeScenario, setActiveScenario] = useState<string>("1");
  
  const [scenario1Data, setScenario1Data] = useState<Scenario1Data>({
    hasIdDocument: true,
    hasSignature: true,
  });

  const [scenario2Data, setScenario2Data] = useState<Scenario2Data>({
    birthDate: "",
  });

  const [scenario3Data, setScenario3Data] = useState<Scenario3Data>({
    isAuthEnabled: false,
    repName: "",
    repId: "",
    repRelationship: "",
    repTitle: "",
  });

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

  // Scenario 1: Missing Identity Documents
  const shouldShowScenario1Banner = () => {
    return !scenario1Data.hasIdDocument || !scenario1Data.hasSignature;
  };

  // Scenario 2: Minor Account
  const shouldShowScenario2Banner = () => {
    if (!scenario2Data.birthDate) return false;
    const age = calculateAge(scenario2Data.birthDate);
    return age < 18;
  };

  // Scenario 3: Authorised Representative
  const shouldShowScenario3Banner = (): boolean => {
    return scenario3Data.isAuthEnabled && 
           Boolean(scenario3Data.repName) && 
           Boolean(scenario3Data.repId) && 
           Boolean(scenario3Data.repRelationship) &&
           Boolean(scenario3Data.repTitle);
  };

  const getScenario3Message = () => {
    return `${scenario3Data.repTitle} ${scenario3Data.repName} (ID: ${scenario3Data.repId}) is the authorised representative, relationship = ${scenario3Data.repRelationship}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Communications Banner Widget
        </h1>
        <p className="text-banking-gray">
          Automated banner system for identity verification, age validation, and authorization management
        </p>
      </div>

      <div className="space-y-4">
        {/* Banner Display Area */}
        <Card className="p-6 bg-banking-gray-light/30 border-dashed min-h-[80px] flex items-center justify-center">
          <div className="w-full max-w-2xl">
            {activeScenario === "1" && (
              <Banner
                type="warning"
                message="O/S ID document and specimen signature"
                show={shouldShowScenario1Banner()}
              />
            )}
            
            {activeScenario === "2" && (
              <Banner
                type="info"
                message="This is a Minor Account"
                show={shouldShowScenario2Banner()}
              />
            )}
            
            {activeScenario === "3" && (
              <Banner
                type="info"
                message={getScenario3Message()}
                show={shouldShowScenario3Banner()}
              />
            )}
            
            {((activeScenario === "1" && !shouldShowScenario1Banner()) ||
              (activeScenario === "2" && !shouldShowScenario2Banner()) ||
              (activeScenario === "3" && !shouldShowScenario3Banner())) && (
              <div className="text-center text-banking-gray italic">
                No banner to display - conditions not met
              </div>
            )}
          </div>
        </Card>

        {/* Scenario Selection and Controls */}
        <Tabs value={activeScenario} onValueChange={setActiveScenario} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-banking-blue-light">
            <TabsTrigger value="1" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Identity Docs
            </TabsTrigger>
            <TabsTrigger value="2" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Minor Account
            </TabsTrigger>
            <TabsTrigger value="3" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Auth Representative
            </TabsTrigger>
          </TabsList>

          <TabsContent value="1" className="mt-4">
            <ScenarioControls
              scenario={1}
              scenario1Data={scenario1Data}
              scenario2Data={scenario2Data}
              scenario3Data={scenario3Data}
              onScenario1Change={setScenario1Data}
              onScenario2Change={setScenario2Data}
              onScenario3Change={setScenario3Data}
            />
          </TabsContent>

          <TabsContent value="2" className="mt-4">
            <ScenarioControls
              scenario={2}
              scenario1Data={scenario1Data}
              scenario2Data={scenario2Data}
              scenario3Data={scenario3Data}
              onScenario1Change={setScenario1Data}
              onScenario2Change={setScenario2Data}
              onScenario3Change={setScenario3Data}
            />
          </TabsContent>

          <TabsContent value="3" className="mt-4">
            <ScenarioControls
              scenario={3}
              scenario1Data={scenario1Data}
              scenario2Data={scenario2Data}
              scenario3Data={scenario3Data}
              onScenario1Change={setScenario1Data}
              onScenario2Change={setScenario2Data}
              onScenario3Change={setScenario3Data}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Status Information */}
      <Card className="p-4 bg-banking-blue-light/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="font-medium text-banking-blue">Scenario 1</div>
            <div className={`text-xs ${shouldShowScenario1Banner() ? 'text-warning' : 'text-banking-gray'}`}>
              {shouldShowScenario1Banner() ? 'Banner Active' : 'No Banner'}
            </div>
          </div>
          <div className="text-center">
            <div className="font-medium text-banking-blue">Scenario 2</div>
            <div className={`text-xs ${shouldShowScenario2Banner() ? 'text-info' : 'text-banking-gray'}`}>
              {shouldShowScenario2Banner() ? 'Banner Active' : 'No Banner'}
            </div>
          </div>
          <div className="text-center">
            <div className="font-medium text-banking-blue">Scenario 3</div>
            <div className={`text-xs ${shouldShowScenario3Banner() ? 'text-info' : 'text-banking-gray'}`}>
              {shouldShowScenario3Banner() ? 'Banner Active' : 'No Banner'}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CommunicationsBannerWidget;