import heroImage from '@/assets/heroImage.jpeg';
export default function HeroImage() {
    return (
        <div style={{ padding: '0 100px', marginTop: '20px' }}>
            <img src={heroImage} alt=" hero image" />
        </div>
    );
}
