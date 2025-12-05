const User = require('../models/User'); 
const bcrypt = require('bcryptjs');     
// Registration Logic
const registerUser = async (req, res) => {

    const { name, email, password } = req.body;

    
    if (!name || !email || !password) {
        
        return res.status(400).json({ msg: 'please fill all fields (name,email,password)' });
    }

    try {
        
        let user = await User.findOne({ email });

        if (user) {
           
            return res.status(400).json({ msg: ' this email is already (registered)' });
        }

        user = new User({
            name,
            email,
            password, 
        });

       
        const salt = await bcrypt.genSalt(10); 
        user.password = await bcrypt.hash(password, salt);

        
        await user.save();

        res.status(201).json({ 
            msg: 'यूज़र सफलतापूर्वक पंजीकृत हुआ।', 
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (err) {
        
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    registerUser
};

console.log('Received body:', req.body);