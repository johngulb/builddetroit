/**
 * Converts a URL path from one format to another
 * 
 * @param url The original image URL
 * @param fromPattern The pattern to match in the URL
 * @param toPattern The pattern to replace with
 * @returns The converted URL
 */
export const convertImageUrl = (
    url: string,
    fromPattern: string,
    toPattern: string
  ): string => {
    if (!url) return url;
    return url.replace(fromPattern, toPattern);
  };
  
  /**
   * Converts an image URL from 800w resized format to tiles format
   * 
   * @param url The original image URL with 800w format
   * @returns The converted URL with tiles format
   */
  export const convertResizedToTiles = (url: string): string => {
    return convertImageUrl(url, 'uploads/resized/800w', 'uploads/resized/tiles');
  };
  
  /**
   * Converts an image URL from tiles format to 800w resized format
   * 
   * @param url The original image URL with tiles format
   * @returns The converted URL with 800w format
   */
  export const convertTilesToResized = (url: string): string => {
    return convertImageUrl(url, 'uploads/resized/tiles', 'uploads/resized/800w');
  };
  
  /**
   * Converts an image URL from default format to 800w resized format
   * 
   * @param url The original image URL with default format
   * @returns The converted URL with 800w format
   */
  export const convertDefaultToResized = (url: string): string => {
    return convertImageUrl(url, 'uploads', 'uploads/resized/800w');
  };
  
  /**
   * Converts an image URL from default format to tiles format
   * 
   * @param url The original image URL with default format
   * @returns The converted URL with tiles format
   */
  export const convertDefaultToTiles = (url: string): string => {
    return convertImageUrl(url, 'uploads', 'uploads/resized/tiles');
  };
  
  /**
   * Converts an image URL from 800w resized format to default format
   * 
   * @param url The original image URL with 800w format
   * @returns The converted URL with default format
   */
  export const convertResizedToDefault = (url: string): string => {
    return convertImageUrl(url, 'uploads/resized/800w', 'uploads');
  };
  
  /**
   * Converts an image URL from tiles format to default format
   * 
   * @param url The original image URL with tiles format
   * @returns The converted URL with default format
   */
  export const convertTilesToDefault = (url: string): string => {
    return convertImageUrl(url, 'uploads/resized/tiles', 'uploads');
  };
  
  