import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function exportPDF(title: string, ele: HTMLDivElement) {
  // 根据dpi放大，防止图片模糊
  const scale = window.devicePixelRatio > 1 ? window.devicePixelRatio : 2;
  html2canvas(ele, {
    // dpi: 300, // 设置截图的分辨率
    scale,
    // background: "#fff",
    useCORS: true,
  }).then(async (canvas) => {
    const a4Width = 595.28;
    // const a4Height = 841.89;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = a4Width;
    const imgHeight = (imgWidth / canvasWidth) * canvasHeight;
    const imgData = canvas.toDataURL("image/png", 1);
    const pdf = new jsPDF(undefined, "pt", "a4");
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight, "", "FAST");
    await pdf.save(`${title}.pdf`);
  });
}
