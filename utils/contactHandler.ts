export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SubmissionResponse {
  success: boolean;
  message: string;
}

/**
 * ============================================================================
 * CONTACT CONFIGURATION BLOCK
 * Edit these values to hook up the form to your preferred back-end service.
 * ============================================================================
 */
export const CONTACT_CONFIG = {
  // Replace with your API endpoint (e.g. Web3Forms, Formspree, Getform, or a custom Next.js API route)
  ENDPOINT_URL: "https://api.web3forms.com/submit",
  
  // Custom receiver email if needed by the backend
  RECEIVER_EMAIL: "anna.jose.p03@gmail.com",
  
  // Simulate delay for preview/development purposes
  SIMULATE_LATENCY_MS: 1200,
  
  // Set to true to mock/simulate the API request locally without sending actual HTTP requests
  USE_SIMULATOR: true, 
};

/**
 * Handles form submission by posting to the configured ENDPOINT_URL or running the local simulator.
 */
export async function submitContactForm(data: ContactFormData): Promise<SubmissionResponse> {
  if (CONTACT_CONFIG.USE_SIMULATOR) {
    // Simulate real network latency
    await new Promise((resolve) => setTimeout(resolve, CONTACT_CONFIG.SIMULATE_LATENCY_MS));

    // Simple test trigger: typing 'error' in the email causes a mock failure
    if (data.email.toLowerCase().includes("error")) {
      return {
        success: false,
        message: "Simulation Error: Failed to establish server handshake. Please check your credentials.",
      };
    }

    return {
      success: true,
      message: "Simulator Success: Your message has been received! (Locally simulated)",
    };
  }

  // Real HTTP Integration
  try {
    const response = await fetch(CONTACT_CONFIG.ENDPOINT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        recipient: CONTACT_CONFIG.RECEIVER_EMAIL,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: result.message || "Message sent successfully!",
      };
    } else {
      return {
        success: false,
        message: result.message || "Failed to submit message to the endpoint.",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "An unexpected network error occurred.",
    };
  }
}
