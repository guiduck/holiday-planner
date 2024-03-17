import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import dynamic from "next/dynamic";
import { Spinner } from "../Spinner";
import handleCreatePlan from "@/lib/actions/create-Plan";
const CancelButton = dynamic(() => import("./cancel-button"), {
  loading: () => <Spinner />,
});

export function AddPlan() {
  return (
    <form action={async (formData) => handleCreatePlan(formData)} method="POST">
      <Card className="rounded-none border-none w-full">
        <CardHeader>
          <CardTitle>Create a new Plan</CardTitle>
          <CardDescription>
            Where would you like to go? Who are you going with?
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" placeholder="Your plan name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="What will you be doing?"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="locations">Locations</Label>
            <Input
              id="locations"
              name="locations"
              placeholder="ex: Brasilia, Portugal, ..."
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="participants">participants</Label>
            <Input
              id="participants"
              name="participants"
              placeholder="ex: Alex, Vitor, ..."
            />
          </div>
        </CardContent>
        <CardFooter className="justify-between space-x-2">
          <CancelButton />
          <Button type="submit">Submit</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
