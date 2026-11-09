import { ImageResponse } from "next/og";

// iOS home-screen icon; browsers use app/icon.svg for the tab.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #5b48e8, #0a0a0a)",
        }}
      >
        <svg width="112" height="112" viewBox="0 0 24 24">
          <path
            fill="#fafafa"
            d="M12 3 4 20h3.5l1.6-3.6h5.8l1.6 3.6H20L12 3Zm-1.7 10.4L12 9.5l1.7 3.9h-3.4Z"
          />
        </svg>
      </div>
    ),
    size,
  );
}
