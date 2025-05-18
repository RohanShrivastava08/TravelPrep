import React from "react";

interface ProgressBarProps {
  progress: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  size = "md",
  showLabel = true,
  className = "",
}) => {
  const getHeight = () => {
    switch (size) {
      case "sm": return "h-1.5";
      case "lg": return "h-3";
      default: return "h-2";
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium text-muted-foreground">
            Progress
          </span>
          <span className="text-xs font-medium">
            {progress}%
          </span>
        </div>
      )}
      <div className={`w-full bg-secondary rounded-full overflow-hidden ${getHeight()}`}>
        <div
          className={`bg-primary progress-bar-animation ${getHeight()}`}
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};

export default ProgressBar;