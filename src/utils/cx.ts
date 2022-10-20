export function cx(...classnames: (string | boolean)[]) {
    return classnames.filter(Boolean).join(" ")
}
