import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

const UserSettingsHead = () => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-3xl font-bold text-primary ">
          <Settings className="h-8 w-8" />
          إعدادات الملف الشخصي
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default UserSettingsHead;
