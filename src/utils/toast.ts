/**
 * Non-blocking toast notification system to replace browser alert().
 */
type ToastType = "error" | "success" | "info";

export function showToast(message: string, type: ToastType = "info"): void {
    if (typeof document === "undefined") return;

    let container = document.getElementById("journey-toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "journey-toast-container";
        container.className = "fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-[90vw] pointer-events-none";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    const bgColors: Record<ToastType, string> = {
        error: "bg-red-600 text-white border-red-700 shadow-red-500/20",
        success: "bg-[#63875e] text-white border-[#52714e] shadow-[#63875e]/20",
        info: "bg-neutral-900 text-white border-neutral-800 shadow-black/20",
    };

    toast.className = `pointer-events-auto flex items-center justify-between p-3.5 rounded-xl shadow-lg border text-sm font-medium transition-all duration-300 transform translate-y-4 opacity-0 ${bgColors[type]}`;
    toast.textContent = message;

    container.appendChild(toast);

    // Trigger transition
    requestAnimationFrame(() => {
        toast.classList.remove("translate-y-4", "opacity-0");
    });

    // Auto remove
    setTimeout(() => {
        toast.classList.add("opacity-0", "translate-y-2");
        setTimeout(() => {
            toast.remove();
            if (container && container.childNodes.length === 0) {
                container.remove();
            }
        }, 300);
    }, 3500);
}
