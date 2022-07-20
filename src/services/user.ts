import {
  EditProfileResponse,
  ImageResponse,
  ProfileRequest,
  ProfileResponse,
} from '../interfaces/auth';
import Instance from './instance';

export function getUser(): Promise<ProfileResponse> {
  return Instance.get('api/Catalog/User');
}
export function postUser(params: ProfileRequest): Promise<EditProfileResponse> {
  return Instance.put('api/Catalog/User', params);
}
export function updateImage(params: string): Promise<ImageResponse> {
  return Instance.put('api/Image', params);
}
