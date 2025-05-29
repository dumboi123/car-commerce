"use client";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CarsList = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", search);
    // You can redirect or filter the cars based on the search term
    // For example, you might want to update the URL or fetch filtered data
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <Button
          onClick={() => router.push("/admin/cars/create")}
          className="flex items-center cursor-pointer "
        >
          <Plus className="h-4 w-4" /> Add car
        </Button>

        <form onSubmit={handleSearchSubmit} className="flex w-full sm:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search cars..."
              className="pl-9 w-full sm:w-60"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>
      </div>
      {/* Cars table  */}
    </div>
  );
};

export default CarsList;
