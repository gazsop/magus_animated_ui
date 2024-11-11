//<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-book-open"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
//export default function ApertureIcon(props: { className?: string }) {
//  return (
//    <svg
//      className={`aperture ${props.className ?? ""}`}
//      fill="none"
//      height="24"
//      stroke="currentColor"
//      stroke-linecap="round"
//      stroke-linejoin="round"
//      stroke-width="2"
//      viewBox="0 0 24 24"
//      width="24"
//      xmlns="http://www.w3.org/2000/svg"
//    >
//      <circle cx="12" cy="12" r="10" />
//      <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
//      <line x1="9.69" y1="8" x2="21.17" y2="8" />
//      <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
//      <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
//      <line x1="14.31" y1="16" x2="2.83" y2="16" />
//      <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
//    </svg>
//  );
//}

export default function BookOpenIcon(props: {
  className?: string;
  onClick?: (e?: Event) => void;
}) {
  return (
    <svg
      className={`book-open ${props.className ?? ""}`}
      onClick={(e) => props.onClick && props.onClick(e)}
      fill="none"
      height="24"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
