# E-Commerce Platform - Entity Relationship Diagram

## ER Diagram

```mermaid
erDiagram
    USER ||--o{ ADDRESS : has
    USER ||--o{ CART : has
    USER ||--o| WISHLIST : has
    USER ||--o{ ORDER : places
    
    PRODUCT ||--o{ CART : "in"
    PRODUCT ||--o{ WISHLIST : "in"
    PRODUCT ||--o{ ORDER : "ordered as"
    
    CART ||--|{ CARTITEM : contains
    CARTITEM }o--|| PRODUCT : references
    
    WISHLIST ||--|{ WISHLISTITEM : contains
    WISHLISTITEM }o--|| PRODUCT : references
    
    ORDER ||--|{ ORDERITEM : contains
    ORDERITEM }o--|| PRODUCT : "references"
    
    ADDRESS {
        string addressType
        string fullName
        string mobile
        string pincode
        string Address
        string city
        string town
        string state
        boolean isDefault
    }
    
    USER {
        objectId _id
        string name
        string email
        string phone
        boolean terms
        boolean updates
        date createdAt
    }
    
    PRODUCT {
        objectId _id
        string name
        string description
        number price
        number discountPrice
        string category
        string subCategory
        string brand
        array images
        number stock
        object attributes
        object ratings
        boolean isActive
        string condition
        date createdAt
    }
    
    CART {
        objectId _id
        objectId user
        string guestId
        array items
        date createdAt
    }
    
    CARTITEM {
        objectId product
        number quantity
        string size
        number price
    }
    
    WISHLIST {
        objectId _id
        objectId user
        string guestId
        array products
        date createdAt
    }
    
    WISHLISTITEM {
        objectId product
    }
    
    ORDER {
        objectId _id
        objectId user
        string orderId
        array items
        object shippingAddress
        string paymentMethod
        string paymentStatus
        string orderStatus
        string orderType
        string trackingId
        object pricing
        date estimatedDelivery
        object paymentInfo
        date createdAt
    }
    
    ORDERITEM {
        objectId product
        string name
        string image
        string size
        number quantity
        number price
        boolean canReview
        boolean isReviewed
        boolean isReturnable
    }
    
    OTP {
        objectId _id
        string phone
        string otp
        object userData
        date expireAt
    }
```

## How to Export to JPG/PNG

### Option 1: Using Mermaid Live Editor (Online)
1. Visit https://mermaid.live
2. Copy the code from the mermaid block above
3. Paste it in the editor
4. Click the "Save diagram" button
5. Choose your export format (PNG, JPG, SVG, etc.)

### Option 2: Using VS Code
1. Install "Markdown Preview Mermaid Support" extension
2. Open this file in VS Code
3. Right-click on the diagram → Download as PNG/SVG

### Option 3: Using Docker (Local)
```bash
docker run --rm -v /path/to/output:/output:rw -v /path/to/file:/input:ro mermaid-cli -i /input/diagram.md -o /output/diagram.png
```

## Database Relationships Summary

| Entity | Relationships |
|--------|---------------|
| **USER** | Has many addresses, carts, wishlists, orders |
| **PRODUCT** | Referenced in carts, wishlists, and orders |
| **CART** | Belongs to user (or guest); Contains items |
| **WISHLIST** | Belongs to user (or guest); Contains products |
| **ORDER** | Belongs to user; Contains items; Has shipping address |
| **ADDRESS** | Belongs to user; Supports multiple addresses |
| **OTP** | Temporary record for authentication |

