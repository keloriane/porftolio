"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/Ui/button";
import { Input } from "@/components/Ui/input";
import { Textarea } from "@/components/Ui/textarea";
import { Label } from "@/components/Ui/label";
import { toast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
  });

  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (contactInfoRef.current && formRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          contactInfoRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.2, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          formRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 },
          "-=0.8"
        );
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.status === 200) {
        toast({
          title: "Success",
          description: `Thank you, ${formData.firstname}. Your message was sent successfully!`,
          duration: 4000,
        });
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          message: "",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        duration: 4000,
      });
    }
  };

  return (
    <section
      id="contact"
      className="py-20 min-h-screen flex items-center bg-gradient-to-br dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <div className="space-y-8">
            <h2
              ref={titleRef}
              className="text-5xl font-bold mb-6 text-gray-800 dark:text-white"
            >
              Get in Touch
            </h2>
            <p
              ref={descRef}
              className="mb-6 text-xl text-gray-600 dark:text-gray-300"
            >
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision. Let's create something
              amazing together!
            </p>
            <div ref={contactInfoRef} className="space-y-4">
              <div className="flex items-center space-x-4 text-gray-700 dark:text-gray-200">
                <Mail className="w-6 h-6" />
                <span>kevin.flbt@gmail.com</span>
              </div>
              <div className="flex items-center space-x-4 text-gray-700 dark:text-gray-200">
                <Phone className="w-6 h-6" />
                <span>+32 494 43 03 47</span>
              </div>
              <div className="flex items-center space-x-4 text-gray-700 dark:text-gray-200">
                <MapPin className="w-6 h-6" />
                <span>Belgium</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg ">
            <form onSubmit={handleSubmit} className="space-y-6" ref={formRef}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstname">First name</Label>
                  <Input
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleInputChange}
                    required
                    placeholder="John"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastname">Last name</Label>
                  <Input
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    required
                    placeholder="Doe"
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="example@mail.com"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="+123 456 7890"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Write your message here..."
                  className="mt-1"
                  rows={4}
                />
              </div>
              <Button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
