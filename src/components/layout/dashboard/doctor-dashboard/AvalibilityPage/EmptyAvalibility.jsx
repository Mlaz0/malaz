import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const EmptyAvalibility = () => {
  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
      <CardContent className="py-12">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
            <Calendar className="h-8 w-8 text-slate-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              No events yet
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Create your first event using the form above
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyAvalibility;
