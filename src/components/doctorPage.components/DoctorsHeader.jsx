"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Grid3X3, List } from "lucide-react";

export const DoctorsHeader = ({
  searchTerm,
  setSearchTerm,
  viewMode,
  setViewMode,
  specialties,
  selectedSpecialty,
  setSelectedSpecialty,
  showHeader,
}) => {
  return (
    <div
      className={`bg-card/80 backdrop-blur-sm border-b sticky top-0 z-10 transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            أخصائيين الصحة النفسية
          </h1>
          <p className="text-muted-foreground text-lg">
            ابحث عن أطباء ومعالجين متخصصين لاحتياجاتك النفسية
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="ابحث عن أطباء أو تخصصات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 focus-ring"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="focus-ring"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="focus-ring"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {specialties.map((specialty) => (
              <Button
                key={specialty._id || "all"}
                variant={
                  selectedSpecialty === specialty.name ? "default" : "outline"
                }
                size="sm"
                onClick={() => setSelectedSpecialty(specialty.name)}
                className="focus-ring hover:scale-105 transition-transform"
              >
                {specialty.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};