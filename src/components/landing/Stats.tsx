import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import CountUp from "react-countup"

const stats = [
  { label: "Alumni Connected", value: 10000, suffix: "+" },
  { label: "Mentorships Completed", value: 2000, suffix: "+" },
  { label: "Events Hosted", value: 500, suffix: "+" },
  { label: "Donations Raised", value: 1, prefix: "$", suffix: "M+" },
]

export function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Impact By <span className="text-gradient">Numbers</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Building a thriving community, one connection at a time
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl text-center glow-border group hover:scale-105 transition-transform"
            >
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                {isInView && (
                  <>
                    {stat.prefix}
                    <CountUp end={stat.value} duration={2.5} separator="," />
                    {stat.suffix}
                  </>
                )}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
