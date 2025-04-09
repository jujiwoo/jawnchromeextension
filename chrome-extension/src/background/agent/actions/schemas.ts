import { z } from 'zod';

export interface ActionSchema {
  name: string;
  description: string;
  schema: z.ZodType;
}

export const doneActionSchema: ActionSchema = {
  name: 'done',
  description: 'Complete task',
  schema: z.object({
    text: z.string(),
  }),
};

export const searchLinkedInActionSchema: ActionSchema = {
  name: 'search_linkedin',
  description: 'Search LinkedIn for jobs using specific parameters',
  schema: z.object({
    query: z.string().describe('Job title or keywords to search for'),
    location: z.string().optional().describe('Geographic location for job search'),
    experienceLevel: z
      .string()
      .optional()
      .describe('Experience level (entry level, associate, mid-senior level, director, executive)'),
    jobType: z.string().optional().describe('Job type (full-time, part-time, contract, internship, temporary)'),
    salary: z.string().optional().describe('Salary range'),
    companyId: z.string().optional().describe('LinkedIn company ID to filter by'),
    datePosted: z.string().optional().describe('Date posted (past_24h, past_week, past_month)'),
    remoteOption: z.boolean().optional().describe('Set to true to filter for remote jobs'),
    easyApplyOnly: z.boolean().optional().describe('Set to true to show only Easy Apply jobs'),
  }),
};

// Basic Navigation Actions
export const searchGoogleActionSchema: ActionSchema = {
  name: 'search_google',
  description: 'Search Google in the current tab',
  schema: z.object({
    query: z.string(),
  }),
};

export const goToUrlActionSchema: ActionSchema = {
  name: 'go_to_url',
  description: 'Navigate to URL in the current tab',
  schema: z.object({
    url: z.string(),
  }),
};

export const goBackActionSchema: ActionSchema = {
  name: 'go_back',
  description: 'Go back to the previous page',
  schema: z.object({}),
};

export const clickElementActionSchema: ActionSchema = {
  name: 'click_element',
  description: 'Click element',
  schema: z.object({
    desc: z.string().optional(), // some small LLM can not generate a description, so let it be optional (but it's still makred as required in json schema)
    index: z.number(),
    xpath: z.string().nullable().optional(),
  }),
};

export const inputTextActionSchema: ActionSchema = {
  name: 'input_text',
  description: 'Input text into an interactive input element',
  schema: z.object({
    desc: z.string().optional(),
    index: z.number(),
    text: z.string(),
    xpath: z.string().nullable().optional(),
  }),
};

// Tab Management Actions
export const switchTabActionSchema: ActionSchema = {
  name: 'switch_tab',
  description: 'Switch to tab by id',
  schema: z.object({
    tab_id: z.number(),
  }),
};

export const openTabActionSchema: ActionSchema = {
  name: 'open_tab',
  description: 'Open URL in new tab',
  schema: z.object({
    url: z.string(),
  }),
};

// Content Actions
export const extractContentActionSchema: ActionSchema = {
  name: 'extract_content',
  description:
    'Extract page content to retrieve specific information from the page, e.g. all company names, a specific description, all information about, links with companies in structured format or simply links',
  schema: z.object({
    goal: z.string(),
  }),
};

// Cache Actions
export const cacheContentActionSchema: ActionSchema = {
  name: 'cache_content',
  description: 'Cache the extracted content of the page',
  schema: z.object({
    content: z.string(),
  }),
};

export const scrollDownActionSchema: ActionSchema = {
  name: 'scroll_down',
  description: 'Scroll down the page by pixel amount - if no amount is specified, scroll down one page',
  schema: z.object({
    desc: z.string().optional(),
    amount: z.number().nullable().optional(),
  }),
};

export const scrollUpActionSchema: ActionSchema = {
  name: 'scroll_up',
  description: 'Scroll up the page by pixel amount - if no amount is specified, scroll up one page',
  schema: z.object({
    desc: z.string().optional(),
    amount: z.number().nullable().optional(),
  }),
};

export const sendKeysActionSchema: ActionSchema = {
  name: 'send_keys',
  description:
    'Send strings of special keys like Backspace, Insert, PageDown, Delete, Enter. Shortcuts such as `Control+o`, `Control+Shift+T` are supported as well. This gets used in keyboard press. Be aware of different operating systems and their shortcuts',
  schema: z.object({
    desc: z.string().optional(),
    keys: z.string(),
  }),
};

export const scrollToTextActionSchema: ActionSchema = {
  name: 'scroll_to_text',
  description: 'If you dont find something which you want to interact with, scroll to it',
  schema: z.object({
    desc: z.string().optional(),
    text: z.string(),
  }),
};

export const getDropdownOptionsActionSchema: ActionSchema = {
  name: 'get_dropdown_options',
  description: 'Get all options from a native dropdown',
  schema: z.object({
    index: z.number(),
  }),
};

export const selectDropdownOptionActionSchema: ActionSchema = {
  name: 'select_dropdown_option',
  description: 'Select dropdown option for interactive element index by the text of the option you want to select',
  schema: z.object({
    index: z.number(),
    text: z.string(),
  }),
};

export const linkedInEasyApplySchema: ActionSchema = {
  name: 'linkedin_easy_apply',
  description: 'Start the Easy Apply process for a LinkedIn job',
  schema: z.object({
    jobId: z.string().optional().describe('The job ID to apply for (if known)'),
    resumeText: z.string().optional().describe('Resume text to use in the application'),
    useDefaultResume: z.boolean().optional().describe('Whether to use the default resume already uploaded to LinkedIn'),
  }),
};

export const linkedInFillApplicationSchema: ActionSchema = {
  name: 'linkedin_fill_application',
  description: 'Fill out fields in a LinkedIn job application form',
  schema: z.object({
    fieldIndexes: z.array(z.number()).describe('The indexes of the form fields to fill'),
    values: z.array(z.string()).describe('The values to put in each field'),
  }),
};

export const linkedInSubmitApplicationSchema: ActionSchema = {
  name: 'linkedin_submit_application',
  description: 'Submit a completed LinkedIn job application',
  schema: z.object({
    confirm: z.boolean().describe('Set to true to confirm submission'),
  }),
};

export const linkedInAutoApplySchema: ActionSchema = {
  name: 'linkedin_auto_apply',
  description: 'Automatically apply to multiple LinkedIn Easy Apply jobs in search results',
  schema: z.object({
    maxJobs: z.number().optional().describe('Maximum number of jobs to apply to (default: 5)'),
    resumeText: z.string().optional().describe('Resume text to use in applications'),
    useDefaultResume: z.boolean().optional().describe('Whether to use default resume from LinkedIn'),
    applyToAll: z.boolean().optional().describe('Whether to apply to all available Easy Apply jobs'),
  }),
};
