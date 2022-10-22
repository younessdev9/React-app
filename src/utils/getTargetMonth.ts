export const getTargetMonth = (target: number) =>
    new Date(new Date().setMonth(new Date().getMonth() + target)).toLocaleString("default", {
        month: "long",
        year: "numeric",
    })
