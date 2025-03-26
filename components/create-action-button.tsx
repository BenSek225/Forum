"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageSquare, Plus, X, Lock, PenSquare } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function CreateActionButton() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={toggleMenu}
              style={{ pointerEvents: "auto" }}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
              className="absolute bottom-20 right-0 mb-2 z-50"
            >
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="rounded-full h-12 shadow-lg flex items-center gap-2 pr-6"
              >
                <Link href="/create-post">
                  <PenSquare className="h-5 w-5" />
                  <span>Nouveau Post</span>
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-36 right-0 mb-2 z-50"
            >
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="rounded-full h-12 shadow-lg flex items-center gap-2 pr-6"
              >
                <Link href="/create-forum?type=private">
                  <Lock className="h-5 w-5" />
                  <span>Forum Privé</span>
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-52 right-0 mb-2 z-50"
            >
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="rounded-full h-12 shadow-lg flex items-center gap-2 pr-6"
              >
                <Link href="/create-forum">
                  <MessageSquare className="h-5 w-5" />
                  <span>Forum Public</span>
                </Link>
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Button
        size="lg"
        className={`rounded-full h-14 w-14 shadow-lg floating-button z-50 ${isOpen ? "bg-red-500 hover:bg-red-600" : ""}`}
        onClick={toggleMenu}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
      </Button>
    </div>
  )
}

