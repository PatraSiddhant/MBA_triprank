import { z } from "zod";

export const TripStatusSchema = z.enum(["planning", "booked", "completed"]);

export const UpdateTripDateSchema = z.object({
    tripId: z.string().cuid(),
    startDate: z.string().nullable(),
    endDate: z.string().nullable(),
}).refine((data) => {
    if (data.startDate && data.endDate) {
        return new Date(data.endDate) >= new Date(data.startDate);
    }
    return true;
}, { message: "End date must be on or after start date" });

export const UpdateTripDestinationSchema = z.object({
    tripId: z.string().cuid(),
    city: z.string().min(1, "City is required").max(100),
    country: z.string().min(1, "Country is required").max(100),
});

export const SaveMemorySchema = z.object({
    tripId: z.string().cuid(),
    highlightMoment: z.string().max(1000).optional(),
    foodPick: z.string().max(500).optional(),
    hiddenGem: z.string().max(500).optional(),
    travelTip: z.string().max(500).optional(),
    wouldReturn: z.boolean().optional(),
    overallRating: z.number().int().min(1).max(5).optional(),
    photoUrl: z.string().url().optional().or(z.literal("")),
});

export const CreatePostSchema = z.object({
    content: z.string().min(1, "Post content cannot be empty").max(2000),
    tripSlug: z.string().optional(),
    imageUrl: z.string().url("Invalid image URL").optional().or(z.literal("")),
});

export const ItineraryItemSchema = z.object({
    title: z.string().min(1, "Title is required").max(200),
    description: z.string().max(1000).default(""),
    timeBucket: z.string().min(1),
});

export const TemplateSlugSchema = z.string().min(1).max(100);

export const LogPastTripDetailsSchema = z.object({
    city: z.string().min(1, "City is required").max(100),
    country: z.string().min(1, "Country is required").max(100),
    startDate: z.string().nullable(),
    endDate: z.string().nullable(),
    overallRating: z.number().int().min(1).max(5),
    highlightMoment: z.string().max(1000).optional(),
    durationDays: z.number().int().min(1).optional(),
}).refine((data) => {
    if (data.startDate && data.endDate) {
        return new Date(data.endDate) >= new Date(data.startDate);
    }
    return true;
}, { message: "End date must be on or after start date" });
