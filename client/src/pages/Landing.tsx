import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 h-screen bg-zinc-900 text-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Collaborate on Documents and Diagrams
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Streamline your team's workflow with our powerful document
                editing and diagramming tools. Bring your ideas to life
                together.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                to="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Try It Free
              </Link>
              <Link
                to="#"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Learn More
              </Link>
            </div>
          </div>
          <img
            src="/assets/hero.png"
            alt="Hero"
            className="mx-auto w-[60%] overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
          />
        </div>
      </div>
    </section>
  );
};

export default Landing;
