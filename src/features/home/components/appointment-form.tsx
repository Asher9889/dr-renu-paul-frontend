"use client";

import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAppointmentForm } from "@/features/home/hooks/use-appointment-form";
import type { AppointmentFormContent } from "@/features/home/types/home-content";
import { PhoneInput } from "@/components/reui/phone-input";



const fieldClassName =
  "h-11 rounded-none border-0 border-b border-input bg-transparent px-2 focus-visible:border-b-2 focus-visible:border-ring focus-visible:ring-0";

const labelClassName = "text-micro text-muted-foreground";

type AppointmentFormProps = {
  content: AppointmentFormContent;
};

export function AppointmentForm({ content }: AppointmentFormProps) {
  const { form, isSubmitting, onSubmit } = useAppointmentForm(
    content.successMessage,
  );

  return (
    <Card className="border border-border bg-card p-6 md:p-8">
      <Form {...form}>
        <form
          noValidate
          aria-busy={isSubmitting}
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClassName}>
                  {content.labels.name}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className={fieldClassName}
                    placeholder={content.placeholders.name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClassName}>
                  {content.labels.phone}
                </FormLabel>
                <FormControl>
                  <PhoneInput
                    defaultCountry="IN"
                    onChange={field.onChange}
                    placeholder={content.placeholders.phone}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClassName}>
                  {content.labels.email}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className={fieldClassName}
                    placeholder={content.placeholders.email}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="concern"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClassName}>
                  {content.labels.concern}
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className={fieldClassName}>
                      <SelectValue placeholder={content.placeholders.concern} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {content.concernOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClassName}>
                  {content.labels.message}
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="min-h-20 rounded-none border-0 border-b border-input bg-transparent px-0 focus-visible:border-b-2 focus-visible:border-ring focus-visible:ring-0"
                    placeholder={content.placeholders.message}
                    rows={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="h-12 cursor-pointer text-micro uppercase text-gold-soft transition-[transform,background-color,color] duration-[var(--duration-feedback)] ease-[var(--ease-quiet)] active:translate-y-px motion-reduce:active:translate-y-0"
            disabled={isSubmitting}
            size="lg"
            type="submit"
          >
            {isSubmitting ? "Sending…" : content.submitLabel}
            <ArrowUpRight aria-hidden className="size-3.5" />
          </Button>

          <p className="text-caption text-muted-foreground">{content.note}</p>
        </form>
      </Form>
    </Card>
  );
}
