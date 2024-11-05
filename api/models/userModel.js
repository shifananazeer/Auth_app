import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({

    username : {
        type :String,
        required : true , 
        unique : true,
    },
    email : {
        type :String,
        required : true , 
        unique : true,
    },
    password : {
        type :String,
        required : true , 
       
    },
    profilePicture : {
        type: String,
        default:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK0AAACUCAMAAADWBFkUAAAAM1BMVEXk5ueutLenrrHn6eqrsbTZ3N3q7O3Lz9Hh4+SyuLvIzM66v8LR1Nbc3+DW2du2u77Cxsl7ANobAAAEEUlEQVR4nO2c3ZazKgxAgSCKgvL+T/uh/TmdTkeBaELXYd/MrJmbvdKQRIEK0Wg0Go1Go9FoNBqNRiMJY4zwc6Qb1l/rBYTw/STVExmc3/5cHyDmcdFavqKVnvoOqvMF4yb55noT1naaTVW+Ma72g+kDZeeKdKGb1N+uW0YEX4sv9HuBvftaV4nudOi6+YYKdMEfB/aevQt/NnQ2zXXLBm5dn+y66kreVuH3a8FvPJ9rzNlMWT3x2SZWgx+6gWvSMSFbNlaGnid1Yc5N2lt0WbowDLlJe7dlSV0oyYNN1zHYdmWuqy69bHFoo+1InrlD0RK7MxDLmvxS+wL1ODYgXKVcaIMLPcqWuuaiEiH2X0pXyJhqP0Nq61ChjdNCR6lbXmxv0D6kYRNBSsLBEdUabsEljG2Ht6V75IEembbrIEYWXAhYWSnpJhsz4W3pioLBlwRKW7ysnJpts6W2PWGVEdp+VQVDPO8+oesO39V5RdkbsB+2hOP4d02M3zWNo590SN9/4J8iZzrZL3tC/663HwJGVGQpq+1q+1Vv7ZCjAvkGdfYu5CvkO5JQvs44dvgQuyTUL/JXSvuZot8kwezucYQ2tt+yhcZ0fqloX4clDzaGJX/Hf2E725g/3GjLkrQP3dzUJd1v+KWbN+jqjvfQEricNGCWjcwyMbx64ZeNXSKtMijqMfEvxuPwatnXciwb5uWgNqipgix4AKL/dK75v8C6uk6Pgxnt53zQ0roKT44LF+x7hLW2obK4PgDh12P5SikdWX9M4zzU6Xonfuid6yOuE/UlwBuwYja2X7l9/iAqghi62bl+vNO79f7L9o+a2D79sNiXxaXv9UBKu6zZW0WUYzjjylrv5ux1s3XJLaPzA2cmA3gXJqv2GsOLspJL6DueEgFGuPjZp5m+dAobPHUexwRwdvfD34uxHv1AJwzDHCTmNZjWU0/ka0S/pA7gO75rRlzuCkMozIBfqMlfu+TAj6gU+InWYb7OF8SYeoMo1Vdelg+wez+vmHBFxwB/cD+vFG1PH4ABzk6CV6ZzyxkMuP2xA/SptzzBoQvsASqclg0wXuwq1zfm59zrA/yGeZLuKS/J0m9pon3x26l0sjF5sbqUsjG6uJty4K8uBj9RmFd7MNDKopLh4p7wmfI+wSArS+9Tw3jNGLNP4R5V6cYoWrfk9CjyLApGt2SlcSTtDZu/BZixD3Y2BeevKHvYO7kn8QzBkLiDzmxpPPXgaZs1MBTd3j+TnH3L/G9xOJucKnbCuXCsbc5RIb5a+9RNr7meXTbjPB7FM+6xbqrtGRdb0KjUk5nAW2xvpH7JAteo+EbiwTFzwh3NE0icys3CLbqROjfWsMgiae2Mve3eSZtsZq2qIO0o/FALKbKN/yf/AA82O2NFo4hyAAAAAElFTkSuQmCC"
    },
    isAdmin: { type: Boolean, default: false },

}  , {timestamps :true})


const User = mongoose.model ('User' , userSchema)

export default User;