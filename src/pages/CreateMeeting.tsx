
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const meetingSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  date: z.string().nonempty("Date is required"),
  time: z.string().nonempty("Time is required"),
  link: z.string().url("Please enter a valid URL"),
});

export default function CreateMeeting() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(meetingSchema),
  });

  const onSubmit = (data) => {
    const existingMeetings = JSON.parse(localStorage.getItem("customMeetings") || "[]");
    const newMeeting = {
      id: Date.now(),
      ...data,
    };
    const updatedMeetings = [...existingMeetings, newMeeting];
    localStorage.setItem("customMeetings", JSON.stringify(updatedMeetings));
    toast.success("Meeting scheduled successfully!");
    navigate("/meetings");
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen p-6 pt-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        <div className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-20" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Schedule a New <span className="text-gradient">Meeting</span>
            </h1>
            <p className="text-muted-foreground">
              Fill in the details below to schedule a new online meeting.
            </p>
          </div>

          <Card className="glass-card p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">Meeting Title</label>
                <Input id="title" placeholder="e.g., Weekly Alumni Connect" {...register("title")} />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
                <Textarea id="description" placeholder="A brief description of the meeting..." {...register("description")} />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium mb-2">Date</label>
                  <Input id="date" type="date" {...register("date")} />
                  {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium mb-2">Time</label>
                  <Input id="time" type="time" {...register("time")} />
                  {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="link" className="block text-sm font-medium mb-2">Meeting Link</label>
                <Input id="link" placeholder="e.g., https://meet.google.com/abc-xyz" {...register("link")} />
                {errors.link && <p className="text-red-500 text-sm mt-1">{errors.link.message}</p>}
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="glow-border">Schedule Meeting</Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </>
  );
}
