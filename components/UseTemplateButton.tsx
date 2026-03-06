"use client";

import { useTransition } from "react";
import { addTripFromTemplateAction } from "../lib/actions";

export default function UseTemplateButton({ slug }: { slug: string }) {
    const [isPending, startTransition] = useTransition();

    return (
        <button
            onClick={() => startTransition(() => addTripFromTemplateAction(slug))}
            disabled={isPending}
            className="btn btn-primary"
            style={{
                width: '100%',
                padding: '1.25rem',
                fontSize: '1rem',
                marginTop: '2rem',
                opacity: isPending ? 0.7 : 1,
                cursor: isPending ? 'wait' : 'pointer'
            }}
        >
            {isPending ? "Adding to Plan..." : "Add to Plan →"}
        </button>
    );
}
