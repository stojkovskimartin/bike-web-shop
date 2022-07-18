package com.example.webshop;

import javax.persistence.*;

@Entity
@Table(name = "bike", schema = "mysqlbase", catalog = "")
public class BikeEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @Basic
    @Column(name = "bike_name")
    private String bikeName;
    @Basic
    @Column(name = "price")
    private int price;
    @Basic
    @Column(name = "brand_name")
    private String brandName;
    @Basic
    @Column(name = "type_name")
    private String typeName;
    @Basic
    @Column(name = "description_brand")
    private String descriptionBrand;
    @Basic
    @Column(name = "description_type")
    private String descriptionType;
    @Basic
    @Column(name = "quantity")
    private long quantity;
    @Basic
    @Column(name = "image")
    private String image;
    @Basic
    @Column(name = "bike_status")
    private String bikeStatus;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getBikeName() {
        return bikeName;
    }

    public void setBikeName(String bikeName) {
        this.bikeName = bikeName;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public String getDescriptionBrand() {
        return descriptionBrand;
    }

    public void setDescriptionBrand(String descriptionBrand) {
        this.descriptionBrand = descriptionBrand;
    }

    public String getDescriptionType() {
        return descriptionType;
    }

    public void setDescriptionType(String descriptionType) {
        this.descriptionType = descriptionType;
    }

    public long getQuantity() {
        return quantity;
    }

    public void setQuantity(long quantity) {
        this.quantity = quantity;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getBikeStatus() {
        return bikeStatus;
    }

    public void setBikeStatus(String bikeStatus) {
        this.bikeStatus = bikeStatus;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BikeEntity that = (BikeEntity) o;

        if (id != that.id) return false;
        if (price != that.price) return false;
        if (quantity != that.quantity) return false;
        if (bikeName != null ? !bikeName.equals(that.bikeName) : that.bikeName != null) return false;
        if (brandName != null ? !brandName.equals(that.brandName) : that.brandName != null) return false;
        if (typeName != null ? !typeName.equals(that.typeName) : that.typeName != null) return false;
        if (descriptionBrand != null ? !descriptionBrand.equals(that.descriptionBrand) : that.descriptionBrand != null)
            return false;
        if (descriptionType != null ? !descriptionType.equals(that.descriptionType) : that.descriptionType != null)
            return false;
        if (image != null ? !image.equals(that.image) : that.image != null) return false;
        if (bikeStatus != null ? !bikeStatus.equals(that.bikeStatus) : that.bikeStatus != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) (id ^ (id >>> 32));
        result = 31 * result + (bikeName != null ? bikeName.hashCode() : 0);
        result = 31 * result + price;
        result = 31 * result + (brandName != null ? brandName.hashCode() : 0);
        result = 31 * result + (typeName != null ? typeName.hashCode() : 0);
        result = 31 * result + (descriptionBrand != null ? descriptionBrand.hashCode() : 0);
        result = 31 * result + (descriptionType != null ? descriptionType.hashCode() : 0);
        result = 31 * result + (int) (quantity ^ (quantity >>> 32));
        result = 31 * result + (image != null ? image.hashCode() : 0);
        result = 31 * result + (bikeStatus != null ? bikeStatus.hashCode() : 0);
        return result;
    }
}
