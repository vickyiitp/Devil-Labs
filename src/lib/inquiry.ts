export interface InquiryPrefillOptions {
  itemTitle?: string;
  projectTitle?: string;
  itemType?: 'Project' | 'Product' | 'Service' | 'Resource' | string;
  inquiryType?: string;
  price?: string;
  driveLink?: string;
  category?: string;
}

export function openInquiryModal(options: InquiryPrefillOptions) {
  const title = options.itemTitle || options.projectTitle || 'Custom Scope';
  const type = options.itemType || options.inquiryType || 'Inquiry';
  
  const briefText = `Inquiry for ${type}: ${title}${
    options.category ? ` [Category: ${options.category}]` : ''
  }${options.price ? ` [Price: ${options.price}]` : ''}${
    options.driveLink ? `\nPublic Drive / Demo Link: ${options.driveLink}` : ''
  }\n\nNotes / Custom Requests:`;

  localStorage.setItem('devil_labs_prefill_brief', briefText);
  if (options.price) {
    localStorage.setItem('devil_labs_prefill_budget', options.price);
  }

  // Trigger modal open event via custom window event
  window.dispatchEvent(new CustomEvent('open-inquiry-modal', { detail: options }));
}
