import { currentFeatures } from "@/lib/features-data";
import { Badge } from "@/components/ui/badge";

export const CurrentFeatures = () => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8">Current Features</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentFeatures.map((category) => (
          <div key={category.category} className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">
              {category.category}
            </h3>
            
            {category.features.map((feature) => (
              <div key={feature.name} className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">{feature.name}</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {feature.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {feature.tech.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};