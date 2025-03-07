"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Header } from "@/components/auth/header";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonHref: string;
  backButtonLabel: string;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
}: CardWrapperProps) => {
  return (
    <Card className="w-[355px] md:w-[400px] lg:w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
