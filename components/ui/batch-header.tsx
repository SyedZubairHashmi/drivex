"use client";

import { Search, Filter, Plus, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BatchHeaderProps {
  title: string;
  onAddNew?: () => void;
  showFilters?: boolean;
  isExpanded?: boolean;
  onToggle?: () => void;
  batchNumber?: string;
}

export function BatchHeader({
  title,
  onAddNew,
  showFilters = true,
  isExpanded = true,
  onToggle,
  batchNumber,
}: BatchHeaderProps) {
  const router = useRouter();

  const handleSeeDetail = () => {
    console.log("See Detail clicked for batch:", batchNumber);
    if (batchNumber) {
      const url = `/cars/inventory/${batchNumber}`;
      console.log("Navigating to:", url);
      router.push(url);
    } else {
      console.error("No batch number provided for navigation");
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>

          <Button
            onClick={handleSeeDetail}
            className="w-[83px] h-[33px] border border-gray-300 rounded-[12px] gap-2 opacity-100 pt-2 pr-[10px] pb-2 pl-[10px] text-gray-700 no-underline bg-white hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer"
            disabled={!batchNumber}
          >
            See Detail
          </Button>
        </div>

        <Button
          className="flex items-center justify-center text-gray-500 bg-white"
          variant="ghost"
          onClick={onToggle}
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "100%",
            // border: "1px solid #d1d5db",
            opacity: 0.4
          }}
        >
          {isExpanded ? (
            <i className="fa-solid fa-circle-minus" style={{ fontSize: "20px" }}></i>
          ) : (
            <i className="fa-solid fa-circle-plus" style={{ fontSize: "20x" }}></i>
          )}
          
        </Button>
      </div>

      {showFilters && isExpanded && (
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search cars..." 
                className="pl-14"
                style={{
                  width: "300px",
                  height: "41px",
                  borderRadius: "12px",
                  gap: "10px",
                  padding: "12px",
                  borderWidth: "1px"
                }}
              />
            </div>

            <Button 
              variant="outline" 
              size="sm"
              style={{
                height: "41px",
                borderRadius: "12px",
                gap: "10px",
                padding: "12px",
                borderWidth: "1px"
              }}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Company" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="honda">Honda</SelectItem>
                <SelectItem value="toyota">Toyota</SelectItem>
                <SelectItem value="nissan">Nissan</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="3">3</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Import Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-28">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="transit">In Transit</SelectItem>
                <SelectItem value="warehouse">Warehouse</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
}
