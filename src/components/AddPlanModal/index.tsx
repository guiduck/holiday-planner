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
import { CancelButton } from "./cancel-button";

export function AddPlan() {
  return (
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
          <Input id="title" placeholder="Your plan name" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="What will you be doing?" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="locations">Locations</Label>
          <Input id="locations" placeholder="ex: Brasilia, Portugal, ..." />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="participants">participants</Label>
          <Input id="participants" placeholder="ex: Alex, Vitor, ..." />
        </div>
      </CardContent>
      <CardFooter className="justify-between space-x-2">
        <CancelButton />
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  );
}
