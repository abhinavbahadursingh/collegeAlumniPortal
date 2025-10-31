import { Users, Calendar, Heart, MessageSquare, Award, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const features = [
  {
    icon: Users,
    title: "Alumni Network",
    description: "Connect with thousands of alumni across industries and locations worldwide"
  },
  {
    icon: Calendar,
    title: "Exclusive Events",
    description: "Access virtual and in-person events, webinars, and networking sessions"
  },
  {
    icon: MessageSquare,
    title: "Mentorship Hub",
    description: "Find mentors or become one. Share knowledge and accelerate growth"
  },
  {
    icon: Heart,
    title: "Give Back",
    description: "Support your alma mater through donations and scholarship programs"
  },
  {
    icon: Award,
    title: "Career Growth",
    description: "Discover job opportunities and career resources from fellow alumni"
  },
  {
    icon: TrendingUp,
    title: "Analytics Dashboard",
    description: "Track engagement, connections, and your impact on the community"
  },
]

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to <span className="text-gradient">Thrive</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive platform designed to strengthen alumni connections and empower success
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 rounded-2xl glow-border group hover:scale-105 transition-all"
              >
                <div className="mb-4 inline-flex p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
