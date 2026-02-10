import { futureFeatures } from "@/lib/features-data";
import { contentConfig } from "@/lib/content-config";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock, Zap, Lightbulb } from "lucide-react";

const priorityConfig = {
  High: {
    icon: Clock,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
  },
  Medium: {
    icon: Zap,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
  },
  Future: {
    icon: Lightbulb,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
};

const statusConfig = {
  "In Progress": "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/30",
  Planned: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
  Research: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
  Future: "bg-gray-500/15 text-gray-600 dark:text-gray-400 border-gray-500/30",
};

export const FutureFeatures = () => {
  const { features } = contentConfig;

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">{features.futureFeatures.title}</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {features.futureFeatures.subtitle}
        </p>
      </div>
      
      <div className="space-y-12">
        {futureFeatures.map((priorityGroup) => {
          const config = priorityConfig[priorityGroup.priority as keyof typeof priorityConfig];
          const Icon = config.icon;
          
          return (
            <div key={priorityGroup.priority}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg ${config.bgColor}`}>
                  <Icon className={`w-5 h-5 ${config.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    {priorityGroup.priority} Priority
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {features.futureFeatures.priorities[priorityGroup.priority as keyof typeof features.futureFeatures.priorities]}
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {priorityGroup.features.map((feature) => (
                  <Card
                    key={feature.name}
                    className="border-muted hover:border-primary/50 transition-all hover:shadow-md group"
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-base group-hover:text-primary transition-colors">
                          {feature.name}
                        </CardTitle>
                        <Badge
                          variant="outline"
                          className={`text-xs ${statusConfig[feature.status as keyof typeof statusConfig]}`}
                        >
                          {feature.status}
                        </Badge>
                      </div>
                      <CardDescription className="text-xs leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};