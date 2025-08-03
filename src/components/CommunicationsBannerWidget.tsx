import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Banner from "./Banner";
import ScenarioControls from "./ScenarioControls";
import { FileText, Calendar, Users, Eye } from "lucide-react";

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
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          CueBot ✨
        </h1>
        <p className="text-sm text-gray-500 font-medium">
          built by Ian Eyono
        </p>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Automated Appian Alerts - Dynamic banner system for identity verification, age validation, and authorized representative notifications
        </p>
      </div>

      <div className="space-y-8">
        {/* Banner Display Area */}
        <Card className="p-8 bg-gray-50 border border-gray-200 rounded-2xl min-h-[120px] flex items-center justify-center">
          <div className="w-full max-w-3xl">
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
              <div className="text-center text-gray-500 italic font-medium">
                No banner to display - conditions not met
              </div>
            )}
          </div>
        </Card>

        {/* Scenario Selection and Controls */}
        <Tabs value={activeScenario} onValueChange={setActiveScenario} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-gray-200 rounded-xl p-1 h-auto shadow-sm">
            <TabsTrigger 
              value="1" 
              className="flex items-center gap-3 px-6 py-4 text-sm font-medium rounded-lg data-[state=active]:bg-gray-900 data-[state=active]:text-white transition-all"
            >
              <FileText className="h-4 w-4" />
              Identity Documents
            </TabsTrigger>
            <TabsTrigger 
              value="2" 
              className="flex items-center gap-3 px-6 py-4 text-sm font-medium rounded-lg data-[state=active]:bg-gray-900 data-[state=active]:text-white transition-all"
            >
              <Calendar className="h-4 w-4" />
              Minor Account
            </TabsTrigger>
            <TabsTrigger 
              value="3" 
              className="flex items-center gap-3 px-6 py-4 text-sm font-medium rounded-lg data-[state=active]:bg-gray-900 data-[state=active]:text-white transition-all"
            >
              <Users className="h-4 w-4" />
              Authorized Rep
            </TabsTrigger>
            <TabsTrigger 
              value="all" 
              className="flex items-center gap-3 px-6 py-4 text-sm font-medium rounded-lg data-[state=active]:bg-gray-900 data-[state=active]:text-white transition-all"
            >
              <Eye className="h-4 w-4" />
              All Banners
            </TabsTrigger>
          </TabsList>

          <TabsContent value="1" className="mt-8">
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

          <TabsContent value="2" className="mt-8">
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

          <TabsContent value="3" className="mt-8">
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

          <TabsContent value="all" className="mt-8">
            <Card className="p-8 bg-white border border-gray-200 shadow-sm rounded-2xl">
              <div className="space-y-6">
                <div className="pb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">All Banners Preview</h3>
                  <p className="text-sm text-gray-600">View how all banners appear when their conditions are met</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Identity Documents Banner</h4>
                    <Banner
                      type="warning"
                      message="O/S ID document and specimen signature"
                      show={shouldShowScenario1Banner()}
                    />
                    {!shouldShowScenario1Banner() && (
                      <div className="text-center text-gray-400 italic py-4 border border-dashed border-gray-200 rounded-xl">
                        Banner hidden - all documents present
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Minor Account Banner</h4>
                    <Banner
                      type="info"
                      message="This is a Minor Account"
                      show={shouldShowScenario2Banner()}
                    />
                    {!shouldShowScenario2Banner() && (
                      <div className="text-center text-gray-400 italic py-4 border border-dashed border-gray-200 rounded-xl">
                        Banner hidden - not a minor account
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Authorized Representative Banner</h4>
                    <Banner
                      type="info"
                      message={getScenario3Message()}
                      show={shouldShowScenario3Banner()}
                    />
                    {!shouldShowScenario3Banner() && (
                      <div className="text-center text-gray-400 italic py-4 border border-dashed border-gray-200 rounded-xl">
                        Banner hidden - no authorized representative configured
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Configure the individual scenarios in their respective tabs to see the banners appear here. 
                    This view shows how multiple banners would stack when their conditions are simultaneously met.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Status Summary */}
      <Card className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-2">
            <div className="text-lg font-semibold text-gray-900">Identity Documents</div>
            <div className={`text-sm px-3 py-1 rounded-full inline-block ${
              shouldShowScenario1Banner() 
                ? 'bg-amber-100 text-amber-800' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {shouldShowScenario1Banner() ? 'Banner Active' : 'No Banner'}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-lg font-semibold text-gray-900">Minor Account</div>
            <div className={`text-sm px-3 py-1 rounded-full inline-block ${
              shouldShowScenario2Banner() 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {shouldShowScenario2Banner() ? 'Banner Active' : 'No Banner'}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-lg font-semibold text-gray-900">Authorized Rep</div>
            <div className={`text-sm px-3 py-1 rounded-full inline-block ${
              shouldShowScenario3Banner() 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {shouldShowScenario3Banner() ? 'Banner Active' : 'No Banner'}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-lg font-semibold text-gray-900">All Banners</div>
            <div className={`text-sm px-3 py-1 rounded-full inline-block ${
              (shouldShowScenario1Banner() || shouldShowScenario2Banner() || shouldShowScenario3Banner())
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {(shouldShowScenario1Banner() || shouldShowScenario2Banner() || shouldShowScenario3Banner()) ? 'Active Banners' : 'No Active Banners'}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CommunicationsBannerWidget;