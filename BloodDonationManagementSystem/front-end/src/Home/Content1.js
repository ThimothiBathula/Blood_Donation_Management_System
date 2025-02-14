import styles from './content1.module.css'
/*types of blood groups*/
const Content1=()=>{
    return(
        <>
        <div className={styles.BloodGroupcontent}>
            <h1>What Are the Blood Types?</h1>
            <p>Categorizing blood according to type helps prevent reactions 
                when someone gets a blood transfusion. Red blood cells have 
                markers on their surface that characterize the cell type. 
                These markers (also called <b>antigens</b>) are proteins and sugars 
                that our bodies use to identify the blood cells as belonging in us.</p>
            <h3 className={styles.bloodTypes}>
            The two main blood groups are ABO and Rh.
            </h3>
            <ul className={styles.Maintypes}><p>The ABO blood system has four main types:</p>

                <li>Type A: This blood type has a marker known as A.</li>
                <li>Type B: This blood type has a marker known as B.</li>
                <li>Type AB: This blood type has both A and B markers.</li>
                <li>Type O: This blood type has neither A nor B markers.</li>
            </ul>
            <ol className={styles.Subtypes}>
                <p>Blood is further classified as being either <b>"Rh positive"</b> (meaning it has Rh factor) or <b>"Rh negative"</b> (without Rh factor).</p>
                <p>So, there are eight possible blood types:</p>
                <li><b>O negative.</b> This blood type doesn't have A or B markers, and it doesn't have Rh factor</li>
                <li><b>O positive.</b> This blood type doesn't have A or B markers, but it does have Rh factor. O positive blood is one of the two most common blood types (the other being A positive).</li>
                <li><b>A negative.</b> This blood type has A marker only.</li>
                <li><b>A positive.</b> This blood type has A marker and Rh factor, but not B marker. Along with O positive, it's one of the two most common blood types.</li>
                <li><b>B negative.</b> This blood type has B marker only.</li>
                <li><b>B positive.</b> This blood type has B marker and Rh factor, but not A marker.</li>
                <li><b>AB negative.</b> This blood type has A and B markers, but not Rh factor.</li>
                <li><b>AB positive.</b> This blood type has all three types of markers — A, B, and Rh factor.</li>

            </ol>
        </div>
        
        </>
    )

}
export default Content1