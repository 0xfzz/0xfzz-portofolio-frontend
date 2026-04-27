"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { ResumePDF } from "@/lib/cv/ResumePDF";
import { Button } from "../ui/button";
import { DownloadSimpleIcon as Download } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface DownloadCVButtonProps {
  label: string;
  data: any;
  variant?: "default" | "secondary" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  showIcon?: boolean;
  className?: string;
}

export function DownloadCVButton({ 
  label, 
  data, 
  variant = "secondary", 
  size = "lg", 
  showIcon = true,
  className
}: DownloadCVButtonProps) {
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch for client-only PDF generation
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Button size={size} variant={variant} className={cn("rounded-md gap-2 font-semibold", className)}>
        {showIcon && <Download className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />}
        {label}
      </Button>
    );
  }

  return (
    <PDFDownloadLink
      document={<ResumePDF data={data} />}
      fileName={`${data.name.replace(/\s+/g, "_")}_Resume.pdf`}
      style={{ textDecoration: 'none' }}
    >
      {({ loading }) => (
        <Button 
          size={size} 
          variant={variant} 
          className={cn("rounded-md gap-2 font-semibold", className)}
          disabled={loading}
          asChild={false}
        >
          <div className="flex items-center gap-2">
            {showIcon && <Download className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />}
            <span>{loading ? "Preparing..." : label}</span>
          </div>
        </Button>
      )}
    </PDFDownloadLink>
  );
}
