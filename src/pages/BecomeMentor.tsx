
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

const mentorSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  expertise: z.string().min(3, "Expertise must be at least 3 characters long"),
  company: z.string().min(3, "Company must be at least 3 characters long"),
  bio: z.string().min(20, "Bio must be at least 20 characters long"),
});

export default function BecomeMentor() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(mentorSchema),
  });

  const onSubmit = (data) => {
    console.log("Mentor application submitted:", data);
    toast.success("Thank you for your application! We will get back to you soon.");
    navigate("/mentorship");
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
              Become a <span className="text-gradient">Mentor</span>
            </h1>
            <p className="text-muted-foreground">
              Share your knowledge and experience with the next generation of alumni.
            </p>
          </div>

          <Card className="glass-card p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
                  <Input id="name" placeholder="e.g., Rajesh Kumar" {...register("name")} />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                  <Input id="email" type="email" placeholder="e.g., rajesh.kumar@example.com" {...register("email")} />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="expertise" className="block text-sm font-medium mb-2">Area of Expertise</label>
                  <Input id="expertise" placeholder="e.g., AI & Machine Learning" {...register("expertise")} />
                  {errors.expertise && <p className="text-red-500 text-sm mt-1">{errors.expertise.message}</p>}
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">Current Company</label>
                  <Input id="company" placeholder="e.g., Infosys" {...register("company")} />
                  {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium mb-2">Short Bio</label>
                <Textarea id="bio" placeholder="Tell us about your experience and what you can offer as a mentor..." {...register("bio")} />
                {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>}
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="glow-border">Submit Application</Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </>
  );
}
