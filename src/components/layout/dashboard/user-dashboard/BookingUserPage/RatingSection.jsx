import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useCreateRating } from "@/hooks/Actions/booking/useCurdsBooking";

export function RatingSection({ doctorId }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { mutate } = useCreateRating(doctorId ? doctorId : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating > 0) {
      setSubmitted(true);
      console.log({ rating, comment });
    }
    mutate({
      data: {
        rating,
        comment,
        doctorId,
      },
    });
  };

  if (submitted) {
    return (
      <section className="max-w-md mx-auto p-6 my-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">شكراً لتقييمك!</h2>
        <p>
          لقد أعطيتنا {rating} نجوم وتعليقك: "{comment}"
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-md mx-auto p-6 my-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">قيم تجربتك</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(rating)}
              className="p-1 focus:outline-none"
            >
              <Star
                size={28}
                className={
                  star <= (hover || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            </button>
          ))}
        </div>

        <div className="mb-4">
          <Textarea
            placeholder="اكتب تعليقك هنا..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <Button type="submit" disabled={rating === 0}>
          إرسال التقييم
        </Button>
      </form>
    </section>
  );
}
