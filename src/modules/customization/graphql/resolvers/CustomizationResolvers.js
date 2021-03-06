
import {
    createCustomization,
    updateCustomization,
    findCustomization,
    updateColors,
    updateLang,
    updateLogo,
    uploadLogo
} from '../../services/CustomizationService'

export default {
    Query: {
        customization: (_, {id}, {user,rbac}) => {
            return findCustomization()
        },
    },
    Mutation: {
        customizationCreate: (_, {input}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, "SECURITY-ADMIN-CREATE")) throw new ForbiddenError("Not Authorized")
            return createCustomization(user, input)
        },
          customizationUpdate: (_, {id, input}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, "SECURITY-ADMIN-UPDATE")) throw new ForbiddenError("Not Authorized")
            return updateCustomization(user, id, input)
        },

        colorsUpdate: (_, {input}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, "SECURITY-ADMIN-UPDATE")) throw new ForbiddenError("Not Authorized")
            return updateColors(user, input)
        },

        logoUpdate: (_, {input}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, "SECURITY-ADMIN-UPDATE")) throw new ForbiddenError("Not Authorized")
            return updateLogo(user, input)
        },

        langUpdate: (_, {input}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, "SECURITY-ADMIN-UPDATE")) throw new ForbiddenError("Not Authorized")
            return updateLang(user, input)
        },

        logoUpload: (_, {file}, {user,rbac}) => {
            if (!user) throw new AuthenticationError("Unauthenticated")
            if(!rbac.isAllowed(user.id, "SECURITY-ADMIN-UPDATE")) throw new ForbiddenError("Not Authorized")
            return uploadLogo(user, file)
        },

    }

}

