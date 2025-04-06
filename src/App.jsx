
import { useState, useEffect } from "react";
import Feedback from "./components/Feedback";
import Options from "./components/Options";
import Notification from "./components/Notification";
import Description from "./components/Description";


function App() {
  const [feedback, setFeedback] = useState(() => {
    try {
      const saved = localStorage.getItem("feedback");
      return saved ? JSON.parse(saved) : { good: 0, neutral: 0, bad: 0 };
    } catch{
      return { good: 0, neutral: 0, bad: 0 };
    }
  });

  useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(feedback));
  }, [feedback]);

  const updateFeedback = (type) => {
    setFeedback((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const handleReset = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
  };

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

  const positivePercentage =
    totalFeedback > 0 ? Math.round((feedback.good / totalFeedback) * 100) : 0;

  return (
    <div>
      <Description />

      <Options
        onFeedback={updateFeedback}
        onReset={handleReset}
        total={totalFeedback}
      />

      {totalFeedback > 0 ? (
        <Feedback
          good={feedback.good}
          neutral={feedback.neutral}
          bad={feedback.bad}
          total={totalFeedback}
          positive={positivePercentage}
        />
      ) : (
        <Notification message="No feedback yet" />
      )}
    </div>
  );
}

export default App;

