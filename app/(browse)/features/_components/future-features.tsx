import { futureFeatures } from "@/lib/features-data";
import { Badge } from "@/components/ui/badge";
import { Clock, Code, Lightbulb } from "lucide-react";

const priorityIcons = {
  High: Clock,
  Medium: Code,
  Future: Lightbulb,
};

const statusColors = {
  "In Progress": "bg-green-500/10 text-green-500 border-green-500/20",
  Planned: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Research: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  Future: "bg-purple-500/10 text-purple-500 border-purple-500/20",
};

export const FutureFeatures = () => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8">Roadmap</h2>
      
      <div className="space-y-8">
        {futureFeatures.map((priorityGroup) => {
          const Icon = priorityIcons[priorityGroup.priority as keyof typeof priorityIcons];
          
          return (
            <div key={priorityGroup.priority}>
              <div className="flex items-center gap-2 mb-4">
                <Icon className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">
                  {priorityGroup.priority} Priority
                </h3>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {priorityGroup.features.map((feature) => (
                  <div
                    key={feature.name}
                    className="border rounded-lg p-4 hover:border-primary/50 transition"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{feature.name}</h4>
                      <Badge
                        variant="outline"
                        className={statusColors[feature.status as keyof typeof statusColors]}
                      >
                        {feature.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};