"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/Ui/button";
import { Input } from "@/components/Ui/input";
import { Textarea } from "@/components/Ui/textarea";
import { Label } from "@/components/Ui/label";
import { Mail, Phone, MapPin, FileArchiveIcon } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success(
          `Thank you, ${formData.firstname}. Your message was sent successfully!`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 min-h-screen flex items-center dark:from-gray-900 dark:to-gray-800"
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
              {`I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision. Let's create something
              amazing together!`}
            </p>
            <div ref={contactInfoRef} className="space-y-4">
              <div className="flex items-center space-x-4 text-gray-700 dark:text-gray-200">
                <Mail className="w-6 h-6" />
                <a href="mailto:kevin.flbt@gmail.com">kevin.flbt@gmail.com</a>
              </div>
              <div className="flex items-center space-x-4 text-gray-700 dark:text-gray-200">
                <Phone className="w-6 h-6" />
                <a href="tel:+32494430347">+32 494 43 03 47</a>
              </div>
              <div className="flex items-center space-x-4 text-gray-700 dark:text-gray-200">
                <MapPin className="w-6 h-6" />
                <span>Belgium</span>
              </div>
              <div className="flex items-center space-x-4 text-gray-700 dark:text-gray-200">
                <FileArchiveIcon className="w-6 h-6" />
                <a href={"/CV-Kevin-Flabat.pdf"} download>
                  Download my resume
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-900 p-8 md:p-10 lg:p-12 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-8" ref={formRef}>
              <div className="grid sm:grid-cols-2 gap-6">
                {Object.entries(formData).map(([key, value]) => (
                  <div
                    key={key}
                    className={key === "message" ? "sm:col-span-2" : ""}
                  >
                    <Label
                      htmlFor={key}
                      className="text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Label>
                    {key === "message" ? (
                      <Textarea
                        id={key}
                        name={key}
                        value={value}
                        onChange={handleInputChange}
                        required
                        placeholder={`Enter your ${key}`}
                        className="mt-2 block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition-colors duration-200 ease-in-out"
                        rows={5}
                        disabled={isLoading}
                      />
                    ) : (
                      <Input
                        id={key}
                        name={key}
                        type={
                          key === "email"
                            ? "email"
                            : key === "phone"
                              ? "tel"
                              : "text"
                        }
                        value={value}
                        onChange={handleInputChange}
                        required
                        placeholder={`Enter your ${key}`}
                        className="mt-2 block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition-colors duration-200 ease-in-out"
                        disabled={isLoading}
                      />
                    )}
                  </div>
                ))}
              </div>
              <Button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-700 focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 transition-transform duration-300 ease-in-out transform hover:scale-105"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
