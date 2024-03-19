"use client";

import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";
import dynamic from "next/dynamic";
import { Spinner } from "../Spinner";
import handleCreatePlan, { PlanFormType } from "@/lib/actions/create-Plan";
import { useAlertStore } from "@/stores/snackbar-store";
import { DatePicker } from "../ui/datepicker";
import { cn } from "@/lib/utils/cn";
import { useForm } from "react-hook-form";
import { Separator } from "../ui/separator";

const CancelButton = dynamic(() => import("./cancel-button"), {
  loading: () => <Spinner />,
});

export function AddPlan({ forDrawer = false }: { forDrawer?: boolean }) {
  const { setAlertData } = useAlertStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlanFormType>();

  async function createPlan(formData: PlanFormType) {
    const parsedData = {
      ...formData,
      locations: formData.locations.toString().split(","),
      participants: formData.participants.toString().split(","),
    };
    const { message, data } = await handleCreatePlan(parsedData);
    setAlertData({
      show: true,
      message: message === "success" ? "New plan created!" : (data as string),
      time: 5000,
      type: message === "success" ? "success" : "error",
    });
  }

  return (
    <div>
      <div className="flex flex-col items-center p-2 pl-0 pt-10 pb-6 md:p-2">
        <CardTitle>Create a new Plan</CardTitle>
        <CardDescription>
          Where would you like to go? Who are you going with?
        </CardDescription>
      </div>
      <Separator orientation="horizontal" />
      <form className="h-full border-b-0" onSubmit={handleSubmit(createPlan)}>
        <Card
          className={cn(
            "rounded-none border-none w-full",
            forDrawer && "bg-background"
          )}
        >
          <CardContent className="grid gap-6 pt-10">
            <div className="grid gap-2">
              <Label htmlFor="date">When will it happen?</Label>
              <DatePicker />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">What am I doing?</Label>
              <Input
                id="title"
                minLength={3}
                placeholder="Your plan name"
                {...register("title", { required: true })}
              />
              {errors.title && <span>This field is required</span>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">What are my plans?</Label>
              <Textarea
                id="description"
                minLength={50}
                placeholder="What will you be doing?"
                {...register("description", { required: true })}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex gap-2 items-center ">
                <Label htmlFor="locations">Where am I going?</Label>
                <p className="text-xs text-muted-background opacity-50">
                  (Separate locations with commas)
                </p>
              </div>
              <Input
                id="locations"
                minLength={3}
                placeholder="ex: Brasilia, Portugal, ..."
                {...register("locations", { required: true })}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex gap-2 items-center ">
                <Label htmlFor="participants">Who is joining me?</Label>
                <p className="text-xs text-muted-background opacity-50">
                  (Separate participants with commas)
                </p>
              </div>
              <Input
                id="participants"
                minLength={3}
                placeholder="ex: Alex, Vitor, ..."
                {...register("participants", { required: true })}
              />
            </div>
          </CardContent>
          <CardFooter className="justify-between space-x-2">
            {!forDrawer && <CancelButton />}
            <Button type="submit">Submit</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default AddPlan;
