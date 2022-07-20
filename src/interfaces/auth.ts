export interface LoginRequest {
  email: string;
  password: string;
}
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface LoginResponse {
  Data: {
    AccessToken: string;
  };
}

export interface CheckoutRequest {
  billingAddress: {
    Name: string;
    Email: string;
    Address: string;
    Phone: string;
  };
  items: {
    ProductId: number;
    Quantity: number;
    TotalPrice: number;
  }[];
}

export interface CheckoutResponse {
  StatusCode: number;
  Data: number;
}

export interface OrderResponse {
  Data: {
    OrderId: number;
    TotalPrice: number;
    OrderDetailStatusId: number;
    BillingAddress: string;
    BillingEmail: string;
    BillingName: string;
    BillingPhone: string;
    DeliveryDate: string;
  }[];
}
export interface HomepageRequest {
  Data: {
    Title: string;
    CategoryID: number;
    Products: {
      Id: number;
      Name: string;
      ShortDescription: string;
      Price: number;
      Quantity: number;
      Image: { Id: number; Link: string }[];
    }[];
  }[];
}

export interface ProfileRequest {
  Name: string;
  Email: string;
  Phone: string;
  Address: string;
}

export interface EditProfileResponse {
  StatusCode: number;
}

export interface ProfileResponse {
  Data: {
    Id: number;
    Name: string;
    Email: string;
    Phone: string;
    AvatarImage: string;
    Address: string;
    Permission: string;
  };
}

export interface ImageResponse {
  Data: string;
}

export interface AddToCartRequest {
  ProductId: number;
  Quantity: number;
}

export interface updateCartRequest {
  CartId: number;
  Quantity: number;
}

export interface CartResponse {
  StatusCode: number;
  Data: {
    CartId: number;
    Products: {
      Id: number;
      Name: string;
      Price: number;
      Quantity: number;
      Capacity: {
        ID: number;
        Name: string;
      };
      Category: {
        Id: number;
        Name: String;
      };
      Color: {
        ID: number;
        Name: string;
        FullDescription: string;
      };
      Images: {
        Id: number;
        Link: string;
      }[];
      ShortDescription: string;
      Status: boolean;
    };
    Quantity: number;
  }[];
}
