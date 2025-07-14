"use client";

import { useState, useEffect } from "react";
import { DoctorsHeader } from "@/components/doctorPage.components/DoctorsHeader";
import { DoctorsList } from "@/components/doctorPage.components/DoctorsList";
import { DoctorsFooter } from "@/components/blog.components/DoctorsFooter";

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("كل التخصصات");
  const [viewMode, setViewMode] = useState("grid");
  const [favorites, setFavorites] = useState([]);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([{ name: "كل التخصصات" }]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorsResponse = await fetch(
          "https://mlaz-backend.vercel.app/api/users/doctors"
        );
        const doctorsData = await doctorsResponse.json();

        const specialtiesResponse = await fetch(
          "https://mlaz-backend.vercel.app/api/categories"
        );
        const specialtiesData = await specialtiesResponse.json();

        if (
          doctorsData.status === "success" &&
          specialtiesData.status === "success"
        ) {
          setDoctors(doctorsData.data.doctors);
          setSpecialties([{ name: "كل التخصصات" }, ...specialtiesData.data]);
        } else {
          throw new Error("فشل في جلب البيانات");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else if (currentScrollY < lastScrollY) {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.doctorData?.specializations?.some((spec) =>
        spec.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesSpecialty =
      selectedSpecialty === "كل التخصصات" ||
      doctor.doctorData?.specializations?.some(
        (spec) => spec.name === selectedSpecialty
      );

    return matchesSearch && matchesSpecialty;
  });

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold mb-2">حدث خطأ</h3>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10">
      <DoctorsHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        viewMode={viewMode}
        setViewMode={setViewMode}
        specialties={specialties}
        selectedSpecialty={selectedSpecialty}
        setSelectedSpecialty={setSelectedSpecialty}
        showHeader={showHeader}
      />

      <DoctorsList
        filteredDoctors={filteredDoctors}
        viewMode={viewMode}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        doctors={doctors}
      />

    </div>
  );
}
