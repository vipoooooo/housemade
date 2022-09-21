import { useStyletron } from "baseui";

export const RequestingWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "10px",
        maxWidth: "600px",
        padding: "20px 10px",
        margin: "0 auto",
        width: "100%",
      })}
    >
      {children}
    </div>
  );
};
